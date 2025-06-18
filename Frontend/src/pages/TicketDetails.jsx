import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const TicketDetails = () => {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    fetchTicket()
  }, [id])

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTicket(response.data)
    } catch (error) {
      toast.error('Failed to fetch ticket details')
      console.error('Error fetching ticket:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setTicket({ ...ticket, status: newStatus })
      toast.success('Status updated successfully')
    } catch (error) {
      toast.error('Failed to update status')
      console.error('Error updating status:', error)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets/${id}/comments`,
        { content: comment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setComment('')
      fetchTicket()
      toast.success('Comment added successfully')
    } catch (error) {
      toast.error('Failed to add comment')
      console.error('Error adding comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Ticket not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-500"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
            <p className="mt-2 text-gray-600">{ticket.description}</p>
            <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap break-words">
              <strong>Helpful Notes:</strong> {ticket.helpfulNotes || 'None'}
            </pre>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Priority:</strong> {ticket.priority || 'Not set'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>Created by: {ticket.createdBy.email}</span>
          <span className="mx-2">•</span>
          <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
          {ticket.assignedTo && (
            <>
              <span className="mx-2">•</span>
              <span>Assigned to: {ticket.assignedTo.email}</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !comment.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Add Comment'
              )}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {ticket.comments?.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {comment.author.email}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
