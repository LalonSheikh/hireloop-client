import { getCompanies } from '@/lib/api/companies';
import { Table } from '@heroui/react';
import React from 'react';
import { updateCompany } from '@/lib/actions/companies';
import { revalidatePath } from 'next/cache';

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  // Server Action handlers for approve and reject
  async function handleApprove(id) {
    'use server';
    const result = await updateCompany(id, { status: 'Approved' });
    console.log(`Approved company with ID: ${id}`, result);
    revalidatePath('/dashboard/admin/companies');
  }

  async function handleReject(id) {
    'use server';
    const result = await updateCompany(id, { status: 'Rejected' });
    console.log(`Rejected company with ID: ${id}`, result);
    revalidatePath('/dashboard/admin/companies');
  }

  return (
    <div className="p-6 md:p-8 bg-[#0A0F17] min-h-screen text-[#E6EDF5]">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-[#E6EDF5]">
          Companies for Review{' '}
          <span className="text-xs font-normal text-[#7C8CA0]">
            ({companies?.length || 0})
          </span>
        </h2>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-[#1E2B3A] bg-[#121B27] overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <Table aria-label="Company approval table" className="w-full text-left border-collapse">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header className="border-b border-[#1E2B3A] bg-[#0F1620] text-[11px] font-mono uppercase tracking-widest text-[#7C8CA0]">
                <Table.Column isRowHeader={true} className="py-4 px-6">Company Name</Table.Column>
                <Table.Column className="py-4 px-6">Recruiter Email</Table.Column>
                <Table.Column className="py-4 px-6">Industry</Table.Column>
                <Table.Column className="py-4 px-6">Jobs Count</Table.Column>
                <Table.Column className="py-4 px-6">Status</Table.Column>
                <Table.Column className="py-4 px-6">Date Submitted</Table.Column>
                <Table.Column className="py-4 px-6 text-right">Actions</Table.Column>
              </Table.Header>

              <Table.Body className="divide-y divide-[#1E2B3A] text-sm">
                {companies && companies.length > 0 ? (
                  companies.map((company) => {
                    // ObjectId কে নিরাপদে স্ট্রিংয়ে কনভার্ট করা
                    const rowId = company._id ? company._id.toString() : Math.random().toString();
                    
                    const initials = company.name 
                      ? company.name.substring(0, 2).toUpperCase() 
                      : 'CO';
                    
                    const formattedDate = company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'N/A';

                    return (
                      <Table.Row key={rowId} id={rowId} className="hover:bg-[#172230] transition-colors">
                        {/* Company Name & Logo */}
                        <Table.Cell className="py-4 px-6 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A2634] font-semibold text-white overflow-hidden border border-[#2A3B4C]">
                            {company.logoUrl ? (
                              <img
                                src={company.logoUrl}
                                alt={company.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-mono">{initials}</span>
                            )}
                          </div>
                          <span className="font-medium text-[#E6EDF5]">
                            {company.name}
                          </span>
                        </Table.Cell>

                        {/* Recruiter Email */}
                        <Table.Cell className="py-4 px-6 text-[#7C8CA0]">
                          {company.recruiterEmail || company.email || "recruiter@hireloop.com"}
                        </Table.Cell>

                        {/* Industry */}
                        <Table.Cell className="py-4 px-6">
                          <span className="inline-block rounded-full bg-[#1A2634] border border-[#2A3B4C] px-3 py-1 text-xs text-[#7C8CA0]">
                            {company.industry || "Technology"}
                          </span>
                        </Table.Cell>

                        {/* Jobs Count */}
                        <Table.Cell className="py-4 px-6">
                          <span className="inline-block rounded-full bg-[#1A2634] border border-[#2A3B4C] px-3 py-1 text-xs text-[#7C8CA0]">
                            {company.jobCount || 0}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell className="py-4 px-6">
                          <div className="inline-flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                company.status === 'Approved'
                                  ? 'bg-[#34D399]'
                                  : company.status === 'Rejected'
                                  ? 'bg-[#F87171]'
                                  : 'bg-[#F5A623]'
                              }`}
                            />
                            <span
                              className={
                                company.status === 'Approved'
                                  ? 'text-[#34D399]'
                                  : company.status === 'Rejected'
                                  ? 'text-[#F87171]'
                                  : 'text-[#F5A623]'
                              }
                            >
                              {company.status || 'Pending'}
                            </span>
                          </div>
                        </Table.Cell>

                        {/* Date Submitted */}
                        <Table.Cell className="py-4 px-6 text-[#7C8CA0]">
                          {formattedDate}
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {company.status !== 'Approved' && (
                              <form action={handleApprove.bind(null, company._id)}>
                                <button
                                  type="submit"
                                  className="rounded-lg bg-emerald-950/40 border border-emerald-900/60 px-3 py-1.5 text-xs font-medium text-[#34D399] hover:bg-emerald-900/45 transition-colors cursor-pointer"
                                >
                                  Approve
                                </button>
                              </form>
                            )}
                            {company.status !== 'Rejected' && (
                              <form action={handleReject.bind(null, company._id)}>
                                <button
                                  type="submit"
                                  className="rounded-lg bg-rose-950/40 border border-rose-900/60 px-3 py-1.5 text-xs font-medium text-[#F87171] hover:bg-rose-900/45 transition-colors cursor-pointer"
                                >
                                  Reject
                                </button>
                              </form>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row key="no-companies" id="no-companies">
                    <Table.Cell colSpan={7} className="py-8 text-center text-[#7C8CA0]">
                      No companies found for review.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default AdminCompaniesPage;


