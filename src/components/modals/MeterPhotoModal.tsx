import React from 'react';
import { MeterReading } from '../../types/billing';
import { X, MapPin, Calendar, Gauge, User } from 'lucide-react';

interface Props {
  reading: MeterReading;
  onClose: () => void;
}

export const MeterPhotoModal: React.FC<Props> = ({ reading, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold">Meter Dial Inspection Proof</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
            <img
              src={reading.photoUrl || '/src/assets/images/meter_reading_dial_1791655156879.jpg'}
              alt={`Meter dial reading ${reading.meterNo}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg text-white flex items-center justify-between text-xs font-mono">
              <span>Meter: {reading.meterNo}</span>
              <span className="text-cyan-400 font-bold">{reading.currentReading} m³</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Gauge className="w-3.5 h-3.5 text-cyan-600" />
                <span>Reading Value</span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm">
                {reading.currentReading} m³ <span className="text-[11px] font-normal text-slate-500">({reading.consumption} m³ diff)</span>
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                <span>Captured On</span>
              </div>
              <p className="font-medium text-slate-800">{reading.readingDate}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <User className="w-3.5 h-3.5 text-cyan-600" />
                <span>Recorded By</span>
              </div>
              <p className="font-medium text-slate-800">{reading.readerName}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                <span>Customer</span>
              </div>
              <p className="font-medium text-slate-800 truncate">{reading.customerName}</p>
            </div>
          </div>

          {reading.notes && (
            <p className="text-xs text-slate-600 bg-cyan-50/60 p-2.5 rounded-lg border border-cyan-100">
              <span className="font-semibold text-cyan-900">Reader Notes:</span> {reading.notes}
            </p>
          )}

          <div className="text-right pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
