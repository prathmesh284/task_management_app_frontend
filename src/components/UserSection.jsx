/**
 * Section Component
 * -----------------
 * Displays a grouped list of users under a given title.
 * Used to separate users by role (Admins / Employees).
 */

const Section = ({ title, users }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3 ml-1">
        {title} ({users.length})
      </h2>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">
          No users found.
        </p>
      ) : (
        <div className="bg-white border rounded-lg divide-y">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 flex justify-between items-center"
            >
              {/* USER DETAILS */}
              <div>
                <p className="font-medium">
                  ID: EMP-{user.id}
                </p>
                <p className="font-medium">
                  Name: {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* ROLE BADGE */}
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;