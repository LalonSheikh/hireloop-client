"use client";

import React from "react";
import Link from "next/link";
import { Chip, Table } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const JobsTable = ({ jobs = [] }) => {
  const handleDelete = (job) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.jobTitle}"?`
    );

    if (!confirmed) return;

    // TODO:
    // Call your delete API/action here
    console.log("Delete job:", job._id);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return "Not specified";

    return `$${Number(min).toLocaleString()} - $${Number(
      max
    ).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#18181b] shadow-xl">
      <Table>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Company jobs table"
            className="min-w-[950px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="2fr"
                id="jobTitle"
                minWidth={220}
              >
                Job Title
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column
                defaultWidth="1fr"
                id="jobType"
                minWidth={130}
              >
                Job Type
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column
                defaultWidth="1.5fr"
                id="location"
                minWidth={170}
              >
                Location
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column
                defaultWidth="1.2fr"
                id="deadline"
                minWidth={150}
              >
                Deadline
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column
                defaultWidth="1fr"
                id="status"
                minWidth={110}
              >
                Status
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column
                defaultWidth="1fr"
                id="actions"
                minWidth={140}
              >
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body
              renderEmptyState={() => (
                <div className="py-12 text-center text-neutral-400">
                  No jobs found.
                </div>
              )}
            >
              {jobs.map((job) => (
                <Table.Row key={job._id}>
                  {/* Job Title */}
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {job.jobTitle}
                      </span>

                      <span className="mt-0.5 text-xs text-neutral-500">
                        {job.jobCategory}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Job Type */}
                  <Table.Cell>
                    <span className="text-sm text-neutral-300">
                      {job.jobType}
                    </span>
                  </Table.Cell>

                  {/* Location */}
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="text-sm text-neutral-300">
                        {job.isRemote ? "Remote" : job.location}
                      </span>

                      <span className="text-xs text-neutral-500">
                        {formatSalary(job.minSalary, job.maxSalary)}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Deadline */}
                  <Table.Cell>
                    <span className="text-sm text-neutral-300">
                      {formatDate(job.deadline)}
                    </span>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={
                        job.status === "active"
                          ? "success"
                          : job.status === "closed"
                            ? "danger"
                            : "warning"
                      }
                    >
                      {job.status
                        ? job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)
                        : "Unknown"}
                    </Chip>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {/* View */}
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}`}
                        aria-label={`View ${job.jobTitle}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                      >
                        <Eye width={17} height={17} />
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                        aria-label={`Edit ${job.jobTitle}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                      >
                        <Pencil width={17} height={17} />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(job)}
                        aria-label={`Delete ${job.jobTitle}`}
                        className="flex h-8 w-8 items-center  justify-center rounded-lg text-red-200 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <TrashBin width={17} height={17} />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default JobsTable;