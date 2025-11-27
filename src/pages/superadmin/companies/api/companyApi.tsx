const API = `${import.meta.env.VITE_BACKEND_LIVE_URL}/companies`;

export const getCompanies = () => fetch(API).then(res => res.json());
export const createCompany = (data: any) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateCompany = (id: string, data: any) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteCompany = (id: string) =>
  fetch(`${API}/${id}`, { method: "DELETE" });

export const getCompanyById = (id: string) =>
  fetch(`${API}/${id}`).then(res => res.json());
