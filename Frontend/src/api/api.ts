import axios from 'axios';
import { Customer, Loan, Admin } from '../types';

const API_BASE_URL = '/api'; // Use relative path for full-stack integration

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerService = {
  register: (data: Customer) => api.post('/customers', data),
  login: (data: Partial<Customer>) => api.post('/login', data),
  getAll: () => api.get<Customer[]>('/customers'),
  getById: (id: number) => api.get<Customer[]>(`/customers/${id}`),
  update: (id: number, data: Customer) => api.put<Customer>(`/customers/${id}`, data),
  delete: (id: number) => api.delete(`/customers/${id}`),
  applyLoan: (id: number, data: Partial<Loan>) => api.post(`/customers/${id}/loan`, data),
  getAllLoans: () => api.get<Loan[]>('/loans'),
  getLoansByCustomerId: (id: number) => api.get<Loan[]>(`/loans/customer/${id}`),
  withdrawLoan: (lid: number) => api.delete(`/loan/${lid}`),
};

export const adminService = {
  login: (data: Admin) => api.post('/admin/login', data),
  getPendingLoans: () => api.get<Loan[]>('/admin/loans/pending'),
  getApprovedLoans: () => api.get<Loan[]>('/admin/loans/approved'),
  getRejectedLoans: () => api.get<Loan[]>('/admin/loans/rejected'),
  approveLoan: (id: number) => api.put(`/admin/loan/${id}/approve`),
  rejectLoan: (id: number) => api.put(`/admin/loan/${id}/reject`),
};

export default api;
