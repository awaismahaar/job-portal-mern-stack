import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import MainHome from "./pages/MainHome.jsx";
import Jobs from "./components/jobs/Jobs.jsx";
import Browse from "./components/browse/Browse.jsx";
import Profile from "./components/profile/Profile.jsx";
import Jobdetails from "./components/jobs/Jobdetails.jsx";
import Companies from "./components/admin/Companies.jsx";
import CreateCompany from "./components/admin/CreateCompany.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import CreateJob from "./components/admin/CreateJob.jsx";
import Applicants from "./components/admin/Applicants.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <MainHome />,
          },
          {
            path: "/jobs",
            element: <Jobs />,
          },
          {
            path: "/browse",
            element: <Browse />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/jobdetails/:id",
            element: <Jobdetails />,
          },
          {
            path: "/admin/companies",
            element: (
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/create-company",
            element: (
              <ProtectedRoute>
                <CreateCompany />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/create-job",
            element: (
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/update-job/:id",
            element: (
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/company/:id",
            element: (
              <ProtectedRoute>
                <CompanySetup />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/jobs",
            element: (
              <ProtectedRoute>
                <AdminJobs />
              </ProtectedRoute>
            ),
          },
          {
            path: "/admin/applicants/:id",
            element: (
              <ProtectedRoute>
                <Applicants />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
