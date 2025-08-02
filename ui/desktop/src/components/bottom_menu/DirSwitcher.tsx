import React, { useState } from 'react';
import { FolderDot } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

interface DirSwitcherProps {
  hasMessages?: boolean;
  className?: string;
}

export const DirSwitcher: React.FC<DirSwitcherProps> = ({
  hasMessages = false,
  className = '',
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleDirectoryChange = async () => {
    if (hasMessages) {
      window.electron.directoryChooser();
    } else {
      window.electron.directoryChooser(true);
    }
  };

  const handleDirectoryClick = async (event: React.MouseEvent) => {
    // Check for cmd-click (Mac) or ctrl-click (Windows/Linux)
    const isCmdOrCtrlClick = event.metaKey || event.ctrlKey;
    
    if (isCmdOrCtrlClick) {
      event.preventDefault();
      event.stopPropagation();
      
      const workingDir = window.appConfig.get('GOOSE_WORKING_DIR') as string;
      if (workingDir) {
        try {
          const success = await window.electron.openDirectoryInExplorer(workingDir);
          if (!success) {
            console.error('Failed to open directory in explorer:', workingDir);
          }
        } catch (error) {
          console.error('Error opening directory in explorer:', error);
        }
      }
    } else {
      // Normal click behavior - change directory
      handleDirectoryChange();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
        <TooltipTrigger asChild>
          <button
            className={`z-[100] hover:cursor-pointer text-text-default/70 hover:text-text-default text-xs flex items-center transition-colors pl-1 [&>svg]:size-4 ${className}`}
            onClick={handleDirectoryClick}
          >
            <FolderDot className="mr-1" size={16} />
            <div className="max-w-[200px] truncate [direction:rtl]">
              {String(window.appConfig.get('GOOSE_WORKING_DIR'))}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-center">
            <div>{window.appConfig.get('GOOSE_WORKING_DIR') as string}</div>
            <div className="text-xs text-text-subtle mt-1">
              Click to change • {window.electron.platform === 'darwin' ? 'Cmd' : 'Ctrl'}+Click to open in {window.electron.platform === 'darwin' ? 'Finder' : 'Explorer'}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
