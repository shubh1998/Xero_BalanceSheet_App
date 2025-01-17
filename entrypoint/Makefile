SHELL:=/bin/bash

# import .env
# You can change the default config with `make cnf="config_special.env" build`
cnf ?= .env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

# DOCKER TASKS
wipe-all: down wipe-volumes wipe-images remove-containers ## Remove images, containers and wipe volumes used by it

down: ## Stop and remove containers
	@docker-compose down
	@docker-compose kill
	@make remove_stopped_containers

remove_stopped_containers: ## Remove stopped containers
	@docker-compose rm -vfs

wipe-volumes: ## Free up the volume
	@sudo rm -rf docker_volumes_data
	@if [[ -n "$$(docker volume ls -qf dangling=true)" ]]; then\
		docker volume rm -f $$(docker volume ls -qf dangling=true);\
  fi
	@docker volume ls -qf dangling=true | xargs -r docker volume rm

wipe-images: ## Remove images
	@if [[ -n "$$(docker images --filter "dangling=true" -q --no-trunc)" ]]; then\
		docker rmi -f $$(docker images --filter "dangling=true" -q --no-trunc);\
	fi
	@if [[ -n "$$(docker images | grep "none" | awk '/ / { print $3 }')" ]]; then\
		docker rmi -f $$(docker images | grep "none" | awk '/ / { print $3 }');\
	fi

install-docker:
	@echo "Installing Docker"

	@sudo apt-get update

	@sudo apt-get install \
		apt-transport-https \
		ca-certificates \
		curl \
		software-properties-common -y

	@curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

	@sudo add-apt-repository \
		"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
		$$(lsb_release -cs) \
		stable"

	@sudo apt-get update

	@sudo apt-get --yes --no-install-recommends install docker-ce

	@sudo usermod --append --groups docker "$$USER"

	@sudo systemctl enable docker

	@echo "Waiting for Docker to start..."

	@sleep 3

	@sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

	@sudo chmod +x /usr/local/bin/docker-compose
	@sleep 5
	@echo "Docker Installed successfully"

install-docker-if-not-already-installed:
	@if [ -z "$$(which docker)" ]; then\
		make install-docker;\
	fi

build-all-docker-images: ## build all docker images
	@echo "Building docker images."
	@echo "Grab a coffe and wait."
	@docker-compose build --force-rm
	@echo "Docker images built"

dirty-up: check-and-create-network ## run docker images without re-building
	@docker-compose up -dV

up: check-and-create-network ## run docker images with building
	@docker-compose up -dV --build

# NETWORK TASK
check-and-create-network: ## Create a network
	@docker network ls | grep xero-balance-sheet-app > /dev/null || docker network create xero-balance-sheet-app

# GIT TASKS
pull: ## Pull the current branch
	@git pull origin $$(git branch | grep \* | cut -d ' ' -f2) --rebase

push: ## Push the current branch
	@git push origin $$(git branch | grep \* | cut -d ' ' -f2) --force-with-lease

commit-message: ## Committing the current branch ex: make commit message ---> git commit -m "BRANCH_NAME: message"
	git commit -m "$$(git branch | grep \* | cut -d ' ' -f2): $(filter-out $@,$(MAKECMDGOALS))"

set-up: install-docker-if-not-already-installed check-and-create-network down build-all-docker-images

reset: wipe-all check-and-create-network set-up down

