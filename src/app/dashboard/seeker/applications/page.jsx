import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import { Table } from "@heroui/react";
import { Briefcase, Calendar, ChevronRight, FileText } from "@gravity-ui/icons";

// ---------------------------------------------
// Helpers
// ---------------------------------------------

function getRelativeTime(dateValue) {
  const date = new Date(dateValue);
  const now = new Date();

  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diffInSeconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---------------------------------------------
// Status Badge
// ---------------------------------------------

function StatusBadge({ status = "Applied" }) {
  const statusStyles = {
    Applied:
      "border-default-400/50 bg-default-400/10 text-default-700 dark:text-default-200",

    Review:
      "border-warning/70 bg-warning/10 text-warning-600 dark:text-warning",

    Shortlisted:
      "border-success/70 bg-success/10 text-success-600 dark:text-success",

    Rejected: "border-danger/70 bg-danger/10 text-danger-600 dark:text-danger",

    Offered:
      "border-primary/70 bg-primary/10 text-primary-600 dark:text-primary",
  };

  const style =
    statusStyles[status] ||
    "border-default-400/50 bg-default-400/10 text-default-700 dark:text-default-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none ${style}`}
    >
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

// ---------------------------------------------
// Main Page
// ---------------------------------------------

const ApplicationPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicant(user?.id);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------------------------------------------
            Page Header
        --------------------------------------------- */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="size-5 text-primary" />
              </div>

              <span className="text-sm font-medium text-primary">
                Career Dashboard
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My Applications
            </h1>

            <p className="mt-1.5 text-sm text-default-500">
              Keep track of the jobs you have applied for.
            </p>
          </div>

          {/* Application count */}
          <div className="flex w-fit items-center gap-2 rounded-xl border border-default-200 bg-default-50 px-4 py-2.5 dark:bg-default-100/5">
            <FileText className="size-4 text-default-500" />

            <span className="text-sm text-default-500">Total applications</span>

            <span className="font-semibold text-foreground">{jobs.length}</span>
          </div>
        </div>

        {/* ---------------------------------------------
            Table Card
        --------------------------------------------- */}
        <div className="overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm">
          <Table className="w-full">
            <Table.ScrollContainer>
              <Table.Content
                aria-label="My job applications"
                className="min-w-[850px]"
              >
                {/* ---------------------------------------------
                    Header
                --------------------------------------------- */}
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    className="h-12 bg-default-50 px-5 text-xs font-medium text-default-600 dark:bg-default-100/5"
                  >
                    Job Title
                  </Table.Column>

                  <Table.Column className="h-12 bg-default-50 px-5 text-xs font-medium text-default-600 dark:bg-default-100/5">
                    Company
                  </Table.Column>

                  <Table.Column className="h-12 bg-default-50 px-5 text-xs font-medium text-default-600 dark:bg-default-100/5">
                    Applied
                  </Table.Column>

                  <Table.Column className="h-12 bg-default-50 px-5 text-xs font-medium text-default-600 dark:bg-default-100/5">
                    Status
                  </Table.Column>

                  <Table.Column className="h-12 bg-default-50 px-5 text-right text-xs font-medium text-default-600 dark:bg-default-100/5">
                    Action
                  </Table.Column>
                </Table.Header>

                {/* ---------------------------------------------
                    Body
                --------------------------------------------- */}
                <Table.Body emptyContent="You haven't applied for any jobs yet.">
                  {jobs.map((application) => {
                    const status = application.status || "Applied";

                    return (
                      <Table.Row
                        key={application._id.toString()}
                        className="group border-b border-default-100 last:border-b-0 hover:bg-default-50/70 dark:hover:bg-default-100/5"
                      >
                        {/* ---------------------------------------------
                            Job Title
                        --------------------------------------------- */}
                        <Table.Cell className="px-5 py-4">
                          <div className="flex min-w-[260px] items-center gap-3">
                            {/* Icon */}
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-default-200 bg-default-100 dark:bg-default-100/10">
                              <Briefcase className="size-[18px] text-default-500" />
                            </div>

                            {/* Job information */}
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-foreground">
                                {application.jobTitle}
                              </p>

                              <p className="mt-1 truncate text-xs text-default-500">
                                {application.jobType}{" "}
                                <span className="mx-1 text-default-300">•</span>
                                Application submitted
                              </p>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* ---------------------------------------------
                            Company
                        --------------------------------------------- */}
                        <Table.Cell className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-default-100 dark:bg-default-100/10">
                              <span className="text-xs font-semibold text-default-500">
                                {application.companyName
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </span>
                            </div>

                            <span className="whitespace-nowrap text-sm text-default-700 dark:text-default-300">
                              {application.companyName}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* ---------------------------------------------
                            Applied
                        --------------------------------------------- */}
                        <Table.Cell className="px-5 py-4">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <Calendar className="size-4 text-default-400" />

                            <span className="text-sm text-default-600 dark:text-default-400">
                              {getRelativeTime(application.createdAt)}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* ---------------------------------------------
                            Status
                        --------------------------------------------- */}
                        <Table.Cell className="px-5 py-4">
                          <StatusBadge status={status} />
                        </Table.Cell>

                        {/* ---------------------------------------------
                            Action
                        --------------------------------------------- */}
                        <Table.Cell className="px-5 py-4 text-right">
                          <a
                            href={`/applications/${application._id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-default-600 transition-colors hover:bg-default-100 hover:text-foreground dark:hover:bg-default-100/10"
                          >
                            Details
                            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* ---------------------------------------------
                Footer
            --------------------------------------------- */}
            <Table.Footer>
              <div className="flex items-center justify-between border-t border-default-200 px-5 py-3.5">
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <span className="size-1.5 rounded-full bg-success" />
                  <span>
                    {jobs.length}{" "}
                    {jobs.length === 1 ? "application" : "applications"}
                  </span>
                </div>

                <span className="text-xs text-default-400">
                  Showing all applications
                </span>
              </div>
            </Table.Footer>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default ApplicationPage;
