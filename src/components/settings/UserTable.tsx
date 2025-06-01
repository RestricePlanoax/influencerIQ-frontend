import React from 'react';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { User } from '../../types';
import Badge from '../common/Badge';

interface UserTableProps {
  users: User[];
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEditUser, onDeleteUser }) => {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="success" label="Admin" />;
      case 'manager':
        return <Badge variant="info" label="Manager" />;
      case 'viewer':
        return <Badge variant="default" label="Viewer" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Permissions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {getRoleBadge(user.role)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-700">
                <div className="flex flex-wrap gap-1">
                  {user.permissions.createCampaigns && (
                    <Badge variant="default" label="Campaigns" />
                  )}
                  {user.permissions.manageCreators && (
                    <Badge variant="default" label="Creators" />
                  )}
                  {user.permissions.manageOutreach && (
                    <Badge variant="default" label="Outreach" />
                  )}
                  {user.permissions.viewFinances && (
                    <Badge variant="default" label="Finances" />
                  )}
                  {user.permissions.manageUsers && (
                    <Badge variant="default" label="Users" />
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500"
                    onClick={() => onEditUser(user.id)}
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-red-500"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;