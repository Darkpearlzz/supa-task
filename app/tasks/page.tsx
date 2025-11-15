"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login");
    });

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    setTasks(data || []);
  };

  const handleAddTask = async () => {
    if (!title || !description) return alert("Fill all fields");
    const user = await supabase.auth.getUser();
    await supabase
      .from("tasks")
      .insert([{ title, description, user_id: user.data.user?.id }]);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  // ✅ Step 1: Add Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <div className="w-full flex flex-col gap-4">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 w-full"
        >
          Add Task
        </button>
      </div>

      <div className="h-4"></div>

      <div className="w-full">
        <ul className="w-full">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-2 mb-2 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end w-full mb-4">
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
