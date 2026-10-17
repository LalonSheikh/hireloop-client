import { Card } from "@heroui/react";
import { 
  MapPin, 
  Briefcase, 
  CircleDollarSign, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function JobCard({ job }) {
  // Fallback data matching your provided object if props aren't passed directly
  const jobData = job || {
    jobTitle: 'Embedded Systems Engineer',
    jobCategory: 'Automotive',
    jobType: 'Full-time',
    minSalary: '4000',
    maxSalary: '8500',
    deadline: '2026-12-28',
    responsibilities: 'Developing vehicle control firmware and diagnostic communication modules',
    isRemote: false,
    companyName: 'Tesla',
    companyLogo: 'https://i.ibb.co.com/5Xzx236G/tesla.png',
  };

const jobId = jobData._id || jobData.id

  return (
    <Card className="max-w-md bg-[#121212] text-white p-6 rounded-3xl border border-neutral-800 shadow-xl">
      
      {/* Header: Company Logo & Title */}
      <Card.Header className="flex flex-col items-start gap-4 pb-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 bg-neutral-800/60 px-3 py-1 rounded-full">
            {jobData.companyName}
          </span>
          <img 
            src={jobData.companyLogo} 
            alt={`${jobData.companyName} logo`} 
            className="w-8 h-8 object-contain rounded-full bg-white p-1"
          />
        </div>
        
        <div>
          <Card.Title className="text-2xl font-bold tracking-tight text-white">
            {jobData.jobTitle}
          </Card.Title>
          <Card.Description className="text-neutral-400 text-sm mt-1 line-clamp-2">
            {jobData.responsibilities}
          </Card.Description>
        </div>
      </Card.Header>

      {/* Content: Badges/Tags for Metadata matching inspiration */}
      <Card.Content className="flex flex-wrap gap-2 py-3">
        {/* Location / Remote Badge */}
        <div className="flex items-center gap-1.5 bg-neutral-800/70 text-pink-300 text-xs px-3.5 py-2 rounded-full font-medium">
          <MapPin className="w-4 h-4" />
          <span>{jobData.isRemote ? "Remote" : "On-site"}</span>
        </div>

        {/* Job Type Badge */}
        <div className="flex items-center gap-1.5 bg-neutral-800/70 text-pink-300 text-xs px-3.5 py-2 rounded-full font-medium">
          <Briefcase className="w-4 h-4" />
          <span>{jobData.jobType}</span>
        </div>

        {/* Salary Range Badge */}
        <div className="flex items-center gap-1.5 bg-neutral-800/70 text-pink-300 text-xs px-3.5 py-2 rounded-full font-medium">
          <CircleDollarSign className="w-4 h-4" />
          <span>${jobData.minSalary}–${jobData.maxSalary}/mo</span>
        </div>
      </Card.Content>

      {/* Footer: Apply Link */}
      <Card.Footer className="pt-4 mt-2 border-t border-neutral-800/60 flex justify-between items-center">
        <Link
          href={`/jobs/${jobId}`}
          className="flex items-center gap-2 text-white font-medium text-sm hover:text-pink-400 transition-colors group"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-xs text-neutral-500">
          Deadline: {jobData.deadline}
        </span>
      </Card.Footer>

    </Card>
  );
}