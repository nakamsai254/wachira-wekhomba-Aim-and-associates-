import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { updateDocument } from '../../services/firestore';
import { CheckCircle, XCircle, Clock, Calendar, Phone, Mail, User, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const Bookings = () => {
  const { data: bookings, loading } = useContent('bookings');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDocument('bookings', id, { status: newStatus });
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update status");
    }
  };

  const filteredBookings = bookings ? bookings.filter((booking: any) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  }).sort((a: any, b: any) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  }) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultation Bookings</h1>
          <p className="text-gray-500">Manage your appointment requests</p>
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking: any) => (
                  <React.Fragment key={booking.id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedId === booking.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                            {booking.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {booking.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          {expandedId === booking.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </td>
                    </tr>
                    {expandedId === booking.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                                <User className="w-4 h-4 mr-2" /> Contact Details
                              </h4>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-400" /> {booking.email}</p>
                                <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-gray-400" /> {booking.phone}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                                <FileText className="w-4 h-4 mr-2" /> Case Description
                              </h4>
                              <p className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                                {booking.description}
                              </p>
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                              {booking.status !== 'confirmed' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleStatusUpdate(booking.id, 'confirmed'); }}
                                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" /> Confirm Booking
                                </button>
                              )}
                              {booking.status !== 'cancelled' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleStatusUpdate(booking.id, 'cancelled'); }}
                                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
                                >
                                  <XCircle className="w-4 h-4 mr-2" /> Cancel Booking
                                </button>
                              )}
                              {booking.status !== 'completed' && booking.status === 'confirmed' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleStatusUpdate(booking.id, 'completed'); }}
                                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                                >
                                  <Clock className="w-4 h-4 mr-2" /> Mark Completed
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No bookings found</div>
          ) : (
            filteredBookings.map((booking: any) => (
              <div key={booking.id} className="p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{booking.name}</h3>
                      <p className="text-xs text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {booking.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">{booking.type}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{booking.description}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                    className="text-primary text-sm font-medium flex items-center"
                  >
                    {expandedId === booking.id ? 'Show Less' : 'View Details'}
                    {expandedId === booking.id ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>
                  
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        className="p-2 bg-green-100 text-green-700 rounded-full"
                        title="Confirm"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        className="p-2 bg-red-100 text-red-700 rounded-full"
                        title="Cancel"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {expandedId === booking.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fadeIn">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Contact Info</h4>
                      <p className="text-sm text-gray-700 flex items-center mb-1"><Mail className="w-3 h-3 mr-2" /> {booking.email}</p>
                      <p className="text-sm text-gray-700 flex items-center"><Phone className="w-3 h-3 mr-2" /> {booking.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Full Description</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{booking.description}</p>
                    </div>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium flex items-center justify-center"
                      >
                        <Clock className="w-4 h-4 mr-2" /> Mark as Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
