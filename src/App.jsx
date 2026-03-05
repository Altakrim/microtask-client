import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { 
  TaskList, 
  MySubmissions, 
  Withdrawals, 
  AddTask, 
  MyTasks, 
  TaskReviews, 
  PurchaseCoin, 
  PaymentHistory,
  ManageUsers,
  ManageTasks,
  Profile
} from './pages/DashboardPages'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Worker Routes */}
      <Route path="/dashboard/tasks" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <TaskList />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/submissions" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <MySubmissions />
        </ProtectedRoute>
      } />
      
      {/* Worker/Buyer Withdrawal Routes */}
      <Route path="/dashboard/withdrawals" element={
        <ProtectedRoute allowedRoles={['worker', 'admin']}>
          <Withdrawals />
        </ProtectedRoute>
      } />
      
      {/* Buyer Routes */}
      <Route path="/dashboard/add-task" element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <AddTask />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/my-tasks" element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <MyTasks />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/reviews" element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <TaskReviews />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/purchase-coin" element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <PurchaseCoin />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/payments" element={
        <ProtectedRoute allowedRoles={['buyer']}>
          <PaymentHistory />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/dashboard/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageUsers />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/manage-tasks" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageTasks />
        </ProtectedRoute>
      } />
      
      {/* Profile Route */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
