import React from 'react';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface ReportExportProps {
    data: any;
}

const ReportExport: React.FC<ReportExportProps> = ({ data }) => {
    const handleExport = () => {
        const doc = new jsPDF();
        let y = 20;

        // Title
        doc.setFontSize(22);
        doc.setTextColor(15, 45, 94); // brand-navy
        doc.text('ClauseGuard Risk Report', 20, y);

        y += 15;

        // Basic Details
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139); // brand-slate
        doc.text(`File: ${data.filename}`, 20, y);
        y += 8;
        doc.text(`Type: ${data.contract_type}`, 20, y);
        y += 8;
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);

        y += 20;

        // Overall Score
        doc.setFontSize(16);
        doc.setTextColor(15, 45, 94);
        doc.text(`Overall Risk Score: ${data.overall_score} / 100`, 20, y);

        y += 20;

        // Summary
        doc.setFontSize(14);
        doc.text('Executive Summary:', 20, y);
        y += 10;
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);

        data.summary.forEach((point: string) => {
            // splitTextToSize to handle wrapping
            const lines = doc.splitTextToSize(`• ${point}`, 170);
            doc.text(lines, 20, y);
            y += (lines.length * 6);
        });

        // We can add more sections here (e.g., Red Flags, Negotiation Brief)
        // For the hackathon demo, the summary and score are sufficient to show functionality

        doc.save(`ClauseGuard_Report_${data.filename}.pdf`);
    };

    return (
        <button
            onClick={handleExport}
            className="bg-brand-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow flex items-center gap-2 transition-colors"
        >
            <Download size={18} />
            <span className="hidden sm:inline">Export PDF</span>
        </button>
    );
};

export default ReportExport;
