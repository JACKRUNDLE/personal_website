"use client";

import React from "react";
import Blog from "../blog/BlogPage";

import AdminPage from "./AdminPage";
const Admin: React.FC = () => (
  <main>
    <AdminPage />
    <Blog/>
    
  </main>
);

export default Admin;