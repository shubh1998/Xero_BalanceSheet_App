import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportRow from '../../Interfaces/ReportView';
import BalanceSheetReport from '../../Interfaces/BalanceSheetReport';

const BalanceSheet: React.FC = () => {
    const [data, setData] = useState<ReportRow[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/balance-sheet');
                const reportData: BalanceSheetReport = response.data;
                setData(reportData.Reports[0].Rows[0].Rows);
            } catch (err) {
                setError('Error fetching balance sheet data');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
          <div className='m-10'>
            <h2 className='error-text'>{error}</h2>
          </div>
        );
    }

    return (
        <table id="records-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.Title}</td>
                        <td>{row.Values.map(v => v.Value).join(', ')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BalanceSheet;
