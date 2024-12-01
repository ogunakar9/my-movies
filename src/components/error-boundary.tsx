import React from 'react';

import { useAppSelector } from '@/app/hooks';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { selectFilmData } from '@/features/film/slice';

const handleClose = () => {
  window.location.reload();
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const filmData = useAppSelector(selectFilmData);

  return (
    <>
      {children}
      {filmData?.Error && (
        <AlertDialog open={!!filmData?.Error} onOpenChange={handleClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{filmData?.Error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ErrorBoundary;
