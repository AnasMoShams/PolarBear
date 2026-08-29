export type Project = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  coverImage: string;
  images: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "windows-activity-monitor",
    name: "Windows Activity Monitor",
    category: "Software Engineering",
    tags: ["System Monitoring"],
    description:
      "Monitors and displays system resource usage, including CPU, RAM, running processes, Process IDs (PIDs), CPU usage, and memory usage in a graphical interface.",
    technologies: [
      "Python",
      "Tkinter",
      "Windows System APIs",
      "psutil",
    ],
    coverImage: "/images/project1_1.png",
    images: [
      "/images/project1_1.png",
      "/images/project1_2.png",
      "/images/project1_3.png",
    ],
    githubUrl:
      "https://github.com/AnasMoShams/Projects/tree/master/Linux-Activity-Monitor-main",
  },

  {
    id: "cpu-scheduling-simulator",
    name: "CPU Scheduling Simulator",
    category: "Operating Systems",
    tags: ["System Programming"],
    description:
      "Simulates CPU scheduling by allowing users to add processes with different arrival times, burst times, priorities, and scheduling parameters. It supports multiple scheduling algorithms and generates a Gantt Chart along with metrics such as waiting time, turnaround time, and response time.",
    technologies: ["Python", "Tkinter", "Matplotlib"],
    coverImage: "/images/project2_1.png",
    images: [
      "/images/project2_1.png",
      "/images/project2_2.png",
    ],
    githubUrl:
      "https://github.com/AnasMoShams/Projects/tree/master/CPU%20Scheduling",
  },
];