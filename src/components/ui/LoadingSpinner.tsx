import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="w-16 h-16 text-primary-500 animate-spin" />
      <p className="text-xl text-gray-400 font-semibold">Cargando juegos...</p>
    </div>
  );
};
