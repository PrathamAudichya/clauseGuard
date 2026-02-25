import React, { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const UploadZone: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stage, setStage] = useState<'Upload' | 'Analyzing' | 'Complete!'>('Upload');
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF or DOCX file.');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const simulateProgress = () => {
    setStage('Analyzing');
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 90) {
        setUploadProgress(90);
        clearInterval(interval);
      } else {
        setUploadProgress(Math.floor(currentProgress));
      }
    }, 500);
    return interval;
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const progressInterval = simulateProgress();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze the contract.');
      }

      const data = await response.json();
      clearInterval(progressInterval);
      setUploadProgress(100);
      setStage('Complete!');

      localStorage.setItem(`analysis_${data.id}`, JSON.stringify(data));
      setTimeout(() => {
        navigate(`/analysis/${data.id}?demo=false`);
      }, 500);

    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || 'An error occurred during upload.');
      setIsUploading(false);
      setUploadProgress(0);
      setStage('Upload');

      const isDemo = window.confirm("Backend not reachable. Proceed with demo mode?");
      if (isDemo) {
        const demoId = "demo_" + Math.floor(Math.random() * 10000);
        navigate(`/analysis/${demoId}?demo=true`);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "relative flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 transition-all duration-300",
          isDragging ? "border-brand-teal bg-brand-teal/5" : "border-white/10 bg-surface-200/35 hover:border-brand-teal/40 hover:bg-brand-teal/5",
          isUploading ? "pointer-events-none" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.docx"
        />

        {stage === 'Upload' && !file && (
          <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
            <div className="mb-4 rounded-2xl bg-brand-teal/10 p-4 text-brand-teal">
              <UploadCloud size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Contract</h3>
            <p className="text-brand-slate text-sm">Or click to browse (PDF, DOCX up to 10MB)</p>
            <p className="mt-6 text-xs text-brand-slate/50 max-w-sm mx-auto">
              Your documents are encrypted and never used to train our models.
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('/compare'); }}
              className="mt-6 mx-auto flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-brand-teal transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              Have a negotiated version? Compare contracts here &rarr;
            </button>
          </div>
        )}

        {stage === 'Analyzing' && (
          <div className="flex flex-col items-center w-full max-w-md">
            <Loader2 size={48} className="text-brand-teal animate-spin mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 animate-pulse">Analyzing Contract...</h3>
            <p className="text-brand-slate text-sm mb-6 text-center">
              Extracting clauses, identifying risks, and generating safer alternatives using AI.
            </p>

            <div className="w-full bg-white/[0.06] rounded-full h-2.5 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-teal to-brand-cyan h-2.5 rounded-full transition-all duration-300 ease-out shadow-lg shadow-brand-teal/20"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-brand-teal">{uploadProgress}%</span>
          </div>
        )}

        {stage === 'Complete!' && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="bg-brand-teal/10 p-4 rounded-2xl mb-4 text-brand-teal">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-xl font-bold text-white">Analysis Complete!</h3>
            <p className="text-brand-slate text-sm mt-2">Redirecting to your results...</p>
          </div>
        )}

        {file && !isUploading && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 w-full">
            <div className="mb-6 flex w-full max-w-md items-center gap-4 rounded-xl border border-white/[0.08] bg-surface-300/90 p-4">
              <div className="bg-brand-teal text-white p-3 rounded-lg">
                <File size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{file.name}</p>
                <p className="text-xs text-brand-slate">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="text-brand-slate hover:text-brand-red p-2 transition-colors"
              >
                &times;
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleUpload(); }}
              className="btn-primary w-full max-w-md py-3 text-lg font-bold"
            >
              Scan For Risks
            </button>
          </div>
        )}
      </div>

      {error && !isUploading && (
        <div className="mt-4 p-3 bg-brand-red/10 border border-brand-red/20 rounded-lg flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="text-brand-red shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-brand-red">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
