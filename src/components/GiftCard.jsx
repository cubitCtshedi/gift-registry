const priorityColors = {
  Low: 'bg-blue-100 text-blue-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700'
}

export default function GiftCard({ gift, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{gift.name}</h3>
          {gift.description && <p className="text-gray-600 text-sm mt-1">{gift.description}</p>}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {gift.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[gift.priority] || priorityColors.Medium}`}>
          {gift.priority} Priority
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          {gift.price && (
            <p className="text-2xl font-bold text-green-600">${parseFloat(gift.price).toFixed(2)}</p>
          )}
        </div>
        {gift.link && (
          <a
            href={gift.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-700 font-bold"
          >
            View Link →
          </a>
        )}
      </div>
    </div>
  )
}
