import ReportRow from "./ReportView";

interface BalanceSheetReport {
    Reports: Array<{
        Rows: Array<{
            Rows: ReportRow[];
        }>;
    }>;
}

export default BalanceSheetReport