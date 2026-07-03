using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TestRunManagement.Data;

public partial class TestRunsDbContext : DbContext
{
    public TestRunsDbContext()
    {
    }

    public TestRunsDbContext(DbContextOptions<TestRunsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TestRun> TestRuns { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=TestsRun;Username=postgres;Password=Pass@123;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TestRun>(entity =>
        {
            entity.HasKey(e => e.TestRunId).HasName("testruns_pkey");

            entity.ToTable("testruns");

            entity.Property(e => e.TestRunId)
                .UseIdentityAlwaysColumn()
                .HasColumnName("testrunid");
            entity.Property(e => e.ChannelNumber).HasColumnName("channelnumber");
            entity.Property(e => e.OperatorName)
                .HasMaxLength(200)
                .HasColumnName("operatorname");
            entity.Property(e => e.Remarks).HasColumnName("remarks");
            entity.Property(e => e.StartDateTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("startdatetime");
            entity.Property(e => e.Status)
                .HasMaxLength(200)
                .HasColumnName("status");
            entity.Property(e => e.TestName)
                .HasMaxLength(100)
                .HasColumnName("testname");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
