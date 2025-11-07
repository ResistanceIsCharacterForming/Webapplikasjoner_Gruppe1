"use client";

import { useTask } from "@/hooks/useTask"

export default function Register() {
  const { user, updateUser } = useTask();

  const onCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
  };

  return (
    <form onSubmit={onCreateUser}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => updateUser({ name: e.target.name })}
        />
      </div>
      <div>
        <label htmlFor="password">Description:</label>
        <textarea
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => updateUser({ password: e.target.password })}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate.toISOString().split("T")[0]}
          onChange={(e) => updateUser({ dueDate: new Date(e.target.updateUser) })}
        />
      </div>
      <button type="submit">Create task</button>
    </form>
  );
}