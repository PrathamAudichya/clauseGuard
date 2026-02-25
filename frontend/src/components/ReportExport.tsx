import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface ReportExportProps {
    data: any;
}

const ReportExport: React.FC<ReportExportProps> = ({ data }) => {
    const handleExport = () => {
        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(22);
        doc.setTextColor(15, 45, 94);
        doc.text('ClauseGuard Risk Report', 20, y);

        y += 15;

        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        doc.text(`File: ${data.filename}`, 20, y);
        y += 8;
        doc.text(`Type: ${data.contract_type}`, 20, y);
        y += 8;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);

        y += 20;

        doc.setFontSize(16);
        doc.setTextColor(15, 45, 94);
        doc.text(`Overall Risk Score: ${data.overall_score} / 100`, 20, y);

        y += 20;

        doc.setFontSize(14);
        doc.text('Executive Summary:', 20, y);
        y += 10;
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);

        data.summary.forEach((point: string) => {
            const lines = doc.splitTextToSize(`• ${point}`, 170);
            doc.text(lines, 20, y);
            y += (lines.length * 6);
        });

        doc.save(`ClauseGuard_Report_${data.filename}.pdf`);
    };

    return (
        <button
            onClick={handleExport}
            className="btn-primary px-5 py-2.5 font-bold"
        >
            <Download size={18} />
            <span className="hidden sm:inline">Export PDF</span>
        </button>
    );
};

export default ReportExport;
