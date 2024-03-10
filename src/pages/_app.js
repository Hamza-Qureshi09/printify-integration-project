import { GlobalInformation } from "@/components/common/CommonProvider";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalInformation>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Component {...pageProps} />
            </SkeletonTheme>

            <ToastContainer position="bottom-right" theme="colored" />
          </QueryClientProvider>
        </Provider>
      </GlobalInformation>
    </>
  );
}
