import React from "react";
import { Login, Signup, AppScope, ProtectedRoute, PublicRoute } from ".";
import { Route, Routes } from "react-router-dom";
import { Home } from "modules";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Master = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppScope>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/">
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute redirectTo="/">
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              exact
              element={
                <ProtectedRoute redirectTo={"/login"}>
                  <Home />
                </ProtectedRoute>
              }
              path={"/*"}
            />
          </Routes>
        </Router>
      </AppScope>
    </QueryClientProvider>
  );
};
