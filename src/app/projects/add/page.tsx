import AddProjectForm from '../../../components/projects/AddProjectForm';
// Note: If you are using @ in your project paths, you can change the first line to:
// import AddProjectForm from '@/components/projects/AddProject';

export default function AddProjectPage() {
  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        
        {/* Button to go back to the projects page */}
        <div className="mb-8 max-w-3xl mx-auto">
          <a 
            href="/projects" 
            className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <span>&larr;</span> Back to Projects
          </a>
        </div>

        {/* Display the add project component we created */}
        <AddProjectForm />
        
      </div>
    </main>
  );
}
