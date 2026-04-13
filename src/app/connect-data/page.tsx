'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Upload, ArrowRight, X } from 'lucide-react';

export default function ConnectDataPage() {
  const router = useRouter();
  const [step, setStep] = useState<'choose' | 'email' | 'csv'>('choose');
  const [email, setEmail] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailConnect = async () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('hungrin_data_connected', 'email');
      localStorage.setItem('hungrin_data_email', email);
      router.push('/promotions');
    }, 1500);
  };

  const handleCSVUpload = async () => {
    if (!csvFile) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem('hungrin_data_connected', 'csv');
      localStorage.setItem('hungrin_csv_data', e.target?.result as string);
      localStorage.setItem('hungrin_csv_filename', csvFile.name);
      setLoading(false);
      router.push('/promotions');
    };
    reader.readAsText(csvFile);
  };

  const handleSkip = () => {
    localStorage.setItem('hungrin_data_connected', 'skipped');
    router.push('/promotions');
  };

  return (
    <div className="min-h-screen bg-[#eaf6f0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Connect Your Data</h1>
            <p className="text-sm text-gray-500 mt-1">
              Help AI create more accurate promotions for your restaurant
            </p>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'choose' && (
          <div className="space-y-4">

            {/* Email Option */}
            <button
              onClick={() => setStep('email')}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition text-left group"
            >
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  Connect Email Inbox
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Automatically parse CSV reports from Uber Eats, Deliveroo & Just Eat emails
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-700 transition" />
            </button>

            {/* CSV Upload Option */}
            <button
              onClick={() => setStep('csv')}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition text-left group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">Upload CSV Manually</div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Upload your sales report CSV file directly from your device
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-700 transition" />
            </button>

            {/* Skip Option */}
            <button
              onClick={handleSkip}
              className="w-full py-4 text-sm text-gray-400 hover:text-gray-600 transition font-medium"
            >
              Skip for now — I'll do this later
            </button>

          </div>
        )}

        {step === 'email' && (
          <div className="space-y-5">
            <button
              onClick={() => setStep('choose')}
              className="text-sm text-green-700 font-semibold hover:underline"
            >
              ← Back
            </button>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Connect Your Email</h2>
              <p className="text-sm text-gray-500">
                We'll automatically detect and parse CSV reports sent by Uber Eats,
                Deliveroo and Just Eat to your inbox.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-700 font-semibold">🔒 100% Secure</p>
              <p className="text-xs text-green-600 mt-1">
                We only read emails from delivery platforms. We never read personal emails
                or store your email credentials.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@restaurant.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 transition"
              />
            </div>

            <button
              onClick={handleEmailConnect}
              disabled={!email || loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 disabled:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Connecting...' : 'Connect Email'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSkip}
              className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Skip for now
            </button>
          </div>
        )}

        {step === 'csv' && (
          <div className="space-y-5">
            <button
              onClick={() => setStep('choose')}
              className="text-sm text-green-700 font-semibold hover:underline"
            >
              ← Back
            </button>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Upload CSV File</h2>
              <p className="text-sm text-gray-500">
                Upload your sales report from Uber Eats, Deliveroo or Just Eat.
              </p>
            </div>

            <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {csvFile ? csvFile.name : 'Click to upload CSV file'}
              </div>
              <div className="text-xs text-gray-400">
                Accepts .csv files up to 10MB
              </div>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              />
            </label>

            <button
              onClick={handleCSVUpload}
              disabled={!csvFile || loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 disabled:bg-gray-300 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Uploading...' : 'Upload & Analyse'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSkip}
              className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Skip for now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}