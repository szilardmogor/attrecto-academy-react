let pendingRequests = 0;
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const subscribeToApiLoading = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getApiLoadingSnapshot = () => pendingRequests > 0;

export const beginApiRequest = () => {
  pendingRequests += 1;
  notify();

  let finishedRequest = false;

  return () => {
    if (finishedRequest) return;

    finishedRequest = true;
    pendingRequests -= 1;
    notify();
  };
};