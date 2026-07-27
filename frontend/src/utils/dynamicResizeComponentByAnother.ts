import { useEffect } from 'react';

const resize = () => {
  let minimumHeightThreshold: number | undefined,
    minimumHeight: number | undefined,
    maximumHeightThreshold: number | undefined,
    maximumHeight: number | undefined,
    componentToResize: HTMLElement | null | undefined,
    componentToMonitor: HTMLElement | null | undefined;

  function initResize(
    minHeightThreshold: number,
    minHeight: number,
    maxHeightThreshold: number,
    maxHeight: number,
    compToResizeId: string,
    compToMonitorId: string,
  ) {
    minimumHeightThreshold = minHeightThreshold;
    minimumHeight = minHeight;
    maximumHeightThreshold = maxHeightThreshold;
    maximumHeight = maxHeight;

    // Resolve string IDs to DOM elements
    componentToResize = document.getElementById(compToResizeId);
    componentToMonitor = document.getElementById(compToMonitorId);

    if (!componentToResize || !componentToMonitor) {
      console.error(
        `Unable to find elements. Check if the IDs '${compToResizeId}' or '${compToMonitorId}' are correct.`,
      );
    }
  }

  function handleResize(
    minimumHeightThreshold: number | undefined,
    minimumHeight: number | undefined,
    maximumHeightThreshold: number | undefined,
    maximumHeight: number | undefined,
    componentToResize: HTMLElement | null | undefined,
    componentToMonitor: HTMLElement | null | undefined,
  ) {
    if (componentToMonitor) {
      const height = componentToMonitor.clientHeight;

      if (minimumHeightThreshold && height < minimumHeightThreshold) {
        if (componentToResize) {
          componentToResize.style.height = `${minimumHeight}px`;
        }
      } else if (maximumHeightThreshold && height > maximumHeightThreshold) {
        if (componentToResize) {
          componentToResize.style.height = `${maximumHeight}px`;
        }
      } else {
        if (componentToResize) {
          componentToResize.style.height = `${height}px`;
        }
      }
    }
  }

  function dynamicResizeComponentByAnother(
    minimumHeightThreshold: number | undefined,
    minimumHeight: number | undefined,
    maximumHeightThreshold: number | undefined,
    maximumHeight: number | undefined,
    compToResizeId: string,
    compToMonitorId: string,
  ) {
    const componentToResize = document.getElementById(compToResizeId);
    const componentToMonitor = document.getElementById(compToMonitorId);

    handleResize(
      minimumHeightThreshold,
      minimumHeight,
      maximumHeightThreshold,
      maximumHeight,
      componentToResize,
      componentToMonitor,
    );
  }

  useEffect(() => {
    // Wait for the componentToMonitor to render and then get its height
    setTimeout(() => {
      dynamicResizeComponentByAnother(
        minimumHeightThreshold,
        minimumHeight,
        maximumHeightThreshold,
        maximumHeight,
        componentToResize?.id || '',
        componentToMonitor?.id || '',
      );
    }, 100);

    if (window) {
      window.addEventListener('resize', () =>
        dynamicResizeComponentByAnother(
          minimumHeightThreshold,
          minimumHeight,
          maximumHeightThreshold,
          maximumHeight,
          componentToResize?.id || '',
          componentToMonitor?.id || '',
        ),
      );
    }

    // Cleanup event listener on component unmount
    return () => {
      if (window) {
        window.removeEventListener('resize', () =>
          dynamicResizeComponentByAnother(
            minimumHeightThreshold,
            minimumHeight,
            maximumHeightThreshold,
            maximumHeight,
            componentToResize?.id || '',
            componentToMonitor?.id || '',
          ),
        );
      }
    };
  }, []);

  return { initResize };
};

export default resize;
