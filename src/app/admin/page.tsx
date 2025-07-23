"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "gunace9166@gmail.com";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passengerRows, setPassengerRows] = useState<any[]>([]);
  const [companionRows, setCompanionRows] = useState<any[]>([]);
  const [passengerCount, setPassengerCount] = useState(0);
  const [companionCount, setCompanionCount] = useState(0);
  const [upcomingPassengerCount, setUpcomingPassengerCount] = useState(0);
  const [upcomingCompanionCount, setUpcomingCompanionCount] = useState(0);
  const [totalPassengerCount, setTotalPassengerCount] = useState(0);
  const [totalCompanionCount, setTotalCompanionCount] = useState(0);
  const [sort, setSort] = useState<{ table: string; key: string; asc: boolean }>({ table: "passenger", key: "flight_date", asc: false });
  const [editRows, setEditRows] = useState<Record<string, any>>({}); // {rowId: {field: value, ...}}
  const [monthUpcomingCount, setMonthUpcomingCount] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user || data.user.email !== ADMIN_EMAIL) {
        router.replace("/");
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router]);

  useEffect(() => {
    if (!loading) fetchData();
    // eslint-disable-next-line
  }, [loading]);

  async function fetchData() {
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
    // Dashboard counts
    const { count: passengerCount } = await supabase
      .from("passenger_requests")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00Z`);
    setPassengerCount(passengerCount || 0);
    const { count: companionCount } = await supabase
      .from("companion_signups")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00Z`);
    setCompanionCount(companionCount || 0);
    // Upcoming flights
    const { count: upcomingPassengerCount } = await supabase
      .from("passenger_requests")
      .select("*", { count: "exact", head: true })
      .gte("flight_date", today);
    setUpcomingPassengerCount(upcomingPassengerCount || 0);
    const { count: upcomingCompanionCount } = await supabase
      .from("companion_signups")
      .select("*", { count: "exact", head: true })
      .gte("flight_date", today);
    setUpcomingCompanionCount(upcomingCompanionCount || 0);
    // Upcoming flights this month (passenger + companion)
    const { count: monthPassenger } = await supabase
      .from("passenger_requests")
      .select("*", { count: "exact", head: true })
      .gte("flight_date", monthStart)
      .lte("flight_date", monthEnd);
    const { count: monthCompanion } = await supabase
      .from("companion_signups")
      .select("*", { count: "exact", head: true })
      .gte("flight_date", monthStart)
      .lte("flight_date", monthEnd);
    setMonthUpcomingCount((monthPassenger || 0) + (monthCompanion || 0));
    // Total counts
    const { count: totalPassengerCount } = await supabase
      .from("passenger_requests")
      .select("*", { count: "exact", head: true });
    setTotalPassengerCount(totalPassengerCount || 0);
    const { count: totalCompanionCount } = await supabase
      .from("companion_signups")
      .select("*", { count: "exact", head: true });
    setTotalCompanionCount(totalCompanionCount || 0);
    // Table data
    const { data: passengers } = await supabase.from("passenger_requests").select("*");
    setPassengerRows(passengers || []);
    const { data: companions } = await supabase.from("companion_signups").select("*");
    setCompanionRows(companions || []);
    setEditRows({});
  }

  function sortRows(rows: any[], key: string, asc: boolean) {
    return [...rows].sort((a, b) => {
      if (a[key] < b[key]) return asc ? -1 : 1;
      if (a[key] > b[key]) return asc ? 1 : -1;
      return 0;
    });
  }

  function handleEditChange(rowId: string, field: string, value: string) {
    setEditRows((prev) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [field]: value },
    }));
  }

  async function handleUpdate(table: string, rowId: string) {
    const rowEdits = editRows[rowId];
    if (!rowEdits) return;
    if (!window.confirm('Are you sure you want to update this row?')) return;
    await supabase.from(table).update(rowEdits).eq("id", rowId);
    setEditRows((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
    fetchData();
  }

  async function handleDelete(table: string, id: string) {
    if (!window.confirm('Are you sure you want to delete this row?')) return;
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  }

  if (loading) return <div className="p-8 text-center text-gray-900">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-gray-900">
      <h2 className="text-lg font-semibold mb-4">
        This month: {monthUpcomingCount} flights
      </h2>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 rounded p-4 text-center">
          <div className="text-xs font-semibold uppercase">Passenger Requests Today</div>
          <div className="text-xl font-bold text-blue-700">{passengerCount}</div>
        </div>
        <div className="bg-green-100 rounded p-4 text-center">
          <div className="text-xs font-semibold uppercase">Companion Signups Today</div>
          <div className="text-xl font-bold text-green-700">{companionCount}</div>
        </div>
        <div className="bg-blue-50 rounded p-4 text-center">
          <div className="text-xs font-semibold uppercase">Upcoming Passenger Flights</div>
          <div className="text-xl font-bold text-blue-700">{upcomingPassengerCount}</div>
        </div>
        <div className="bg-green-50 rounded p-4 text-center">
          <div className="text-xs font-semibold uppercase">Upcoming Companion Flights</div>
          <div className="text-xl font-bold text-green-700">{upcomingCompanionCount}</div>
        </div>
        <div className="bg-blue-50 rounded p-4 text-center col-span-2 md:col-span-1">
          <div className="text-xs font-semibold uppercase">Total Passengers</div>
          <div className="text-xl font-bold text-blue-700">{totalPassengerCount}</div>
        </div>
        <div className="bg-green-50 rounded p-4 text-center col-span-2 md:col-span-1">
          <div className="text-xs font-semibold uppercase">Total Companions</div>
          <div className="text-xl font-bold text-green-700">{totalCompanionCount}</div>
        </div>
      </div>
      <hr className="my-8" />
      {/* Passenger Requests Table */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Passenger Requests</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border border-gray-300 text-sm bg-white">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 text-gray-900">
              {['name','email','phone','from_location','to_location','airline','flight_date','status','notes','created_at','actions'].map((key) => (
                <th key={key} className="p-2 cursor-pointer border-b border-gray-300 whitespace-nowrap" onClick={() => key !== 'actions' && setSort({ table: 'passenger', key, asc: sort.key === key ? !sort.asc : true })}>
                  {key !== 'actions' ? key.replace('_',' ').toUpperCase() : ''}
                  {sort.table === 'passenger' && sort.key === key && (sort.asc ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortRows(passengerRows, sort.table === 'passenger' ? sort.key : 'flight_date', sort.asc).map((row) => (
              <tr key={row.id} className={`border-b border-gray-300 hover:bg-gray-100 ${editRows[row.id] ? 'bg-yellow-50' : ''}`}>
                {['name','email','phone','from_location','to_location','airline','flight_date','status','notes','created_at'].map((field) => (
                  <td key={field} className="p-2 whitespace-nowrap">
                    {editRows[row.id] && field in editRows[row.id] ? (
                      <input
                        className="border border-gray-400 px-1 rounded text-gray-900 bg-white"
                        value={editRows[row.id][field]}
                        onChange={e => handleEditChange(row.id, field, e.target.value)}
                      />
                    ) : (
                      <span onDoubleClick={() => handleEditChange(row.id, field, row[field] || '')}>{row[field]}</span>
                    )}
                  </td>
                ))}
                <td className="p-2 whitespace-nowrap flex gap-2 items-center justify-center bg-gray-50 sticky right-0 z-10">
                  {editRows[row.id] && (
                    <button onClick={() => handleUpdate('passenger_requests', row.id)} className="text-green-700 hover:underline font-semibold">Update</button>
                  )}
                  <button onClick={() => handleDelete('passenger_requests', row.id)} className="text-red-600 hover:underline font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-8" />
      {/* Companion Signups Table */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Companion Signups</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border border-gray-300 text-sm bg-white">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 text-gray-900">
              {['name','email','phone','from_location','to_location','airline','flight_date','status','notes','created_at','actions'].map((key) => (
                <th key={key} className="p-2 cursor-pointer border-b border-gray-300 whitespace-nowrap" onClick={() => key !== 'actions' && setSort({ table: 'companion', key, asc: sort.key === key ? !sort.asc : true })}>
                  {key !== 'actions' ? key.replace('_',' ').toUpperCase() : ''}
                  {sort.table === 'companion' && sort.key === key && (sort.asc ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortRows(companionRows, sort.table === 'companion' ? sort.key : 'flight_date', sort.asc).map((row) => (
              <tr key={row.id} className={`border-b border-gray-300 hover:bg-gray-100 ${editRows[row.id] ? 'bg-yellow-50' : ''}`}>
                {['name','email','phone','from_location','to_location','airline','flight_date','status','notes','created_at'].map((field) => (
                  <td key={field} className="p-2 whitespace-nowrap">
                    {editRows[row.id] && field in editRows[row.id] ? (
                      <input
                        className="border border-gray-400 px-1 rounded text-gray-900 bg-white"
                        value={editRows[row.id][field]}
                        onChange={e => handleEditChange(row.id, field, e.target.value)}
                      />
                    ) : (
                      <span onDoubleClick={() => handleEditChange(row.id, field, row[field] || '')}>{row[field]}</span>
                    )}
                  </td>
                ))}
                <td className="p-2 whitespace-nowrap flex gap-2 items-center justify-center bg-gray-50 sticky right-0 z-10">
                  {editRows[row.id] && (
                    <button onClick={() => handleUpdate('companion_signups', row.id)} className="text-green-700 hover:underline font-semibold">Update</button>
                  )}
                  <button onClick={() => handleDelete('companion_signups', row.id)} className="text-red-600 hover:underline font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 