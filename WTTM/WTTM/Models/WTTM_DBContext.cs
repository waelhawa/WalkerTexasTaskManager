using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WTTM.Models
{
    public partial class WTTM_DBContext : DbContext
    {
        public WTTM_DBContext()
        {
        }

        public WTTM_DBContext(DbContextOptions<WTTM_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<DeviceCodes> DeviceCodes { get; set; }
        public virtual DbSet<PersistedGrants> PersistedGrants { get; set; }
        public virtual DbSet<Sprints> Sprints { get; set; }
        public virtual DbSet<Tasks> Tasks { get; set; }
        public virtual DbSet<Teams> Teams { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:wttmserver.database.windows.net,1433;Initial Catalog=WTTM_DB;Persist Security Info=False;User ID=wttmadmin;Password=Turtleking.64;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.ProviderKey).HasMaxLength(128);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.TeamId).HasColumnName("teamId");

                entity.Property(e => e.UserName).HasMaxLength(256);

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.AspNetUsers)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__AspNetUse__teamI__03F0984C");
            });

            modelBuilder.Entity<DeviceCodes>(entity =>
            {
                entity.HasKey(e => e.UserCode);

                entity.HasIndex(e => e.DeviceCode)
                    .IsUnique();

                entity.HasIndex(e => e.Expiration);

                entity.Property(e => e.UserCode).HasMaxLength(200);

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Data).IsRequired();

                entity.Property(e => e.DeviceCode)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.SubjectId).HasMaxLength(200);
            });

            modelBuilder.Entity<PersistedGrants>(entity =>
            {
                entity.HasKey(e => e.Key);

                entity.HasIndex(e => e.Expiration);

                entity.HasIndex(e => new { e.SubjectId, e.ClientId, e.Type });

                entity.Property(e => e.Key).HasMaxLength(200);

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Data).IsRequired();

                entity.Property(e => e.SubjectId).HasMaxLength(200);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Sprints>(entity =>
            {
                entity.HasKey(e => e.SprintId)
                    .HasName("PK__sprints__0C3799E30B6D0AB4");

                entity.ToTable("sprints");

                entity.Property(e => e.SprintId).HasColumnName("sprintId");

                entity.Property(e => e.DateCompleted)
                    .HasColumnName("dateCompleted")
                    .HasColumnType("date");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("dateCreated")
                    .HasColumnType("date");

                entity.Property(e => e.IsCompleted).HasColumnName("isCompleted");

                entity.Property(e => e.SprintStatus)
                    .HasColumnName("sprintStatus")
                    .HasMaxLength(30);

                entity.Property(e => e.TeamId).HasColumnName("teamId");

                entity.Property(e => e.TotalStoryPoints).HasColumnName("totalStoryPoints");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Sprints)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__sprints__teamId__02FC7413");
            });

            modelBuilder.Entity<Tasks>(entity =>
            {
                entity.HasKey(e => e.TaskId)
                    .HasName("PK__tasks__DD5D5A42B9CAD2AD");

                entity.ToTable("tasks");

                entity.Property(e => e.TaskId).HasColumnName("taskId");

                entity.Property(e => e.DateCompleted)
                    .HasColumnName("dateCompleted")
                    .HasColumnType("date");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("dateCreated")
                    .HasColumnType("date");

                entity.Property(e => e.FullDesc)
                    .IsRequired()
                    .HasColumnName("fullDesc")
                    .HasMaxLength(300);

                entity.Property(e => e.IsCompleted).HasColumnName("isCompleted");

                entity.Property(e => e.ScoreKeep).HasColumnName("scoreKeep");

                entity.Property(e => e.ShortDesc)
                    .IsRequired()
                    .HasColumnName("shortDesc")
                    .HasMaxLength(50);

                entity.Property(e => e.SprintId).HasColumnName("sprintId");

                entity.Property(e => e.StoryPoint).HasColumnName("storyPoint");

                entity.Property(e => e.TaskStatus)
                    .HasColumnName("taskStatus")
                    .HasMaxLength(30);

                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .HasMaxLength(450);

                entity.HasOne(d => d.Sprint)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.SprintId)
                    .HasConstraintName("FK__tasks__sprintId__0A9D95DB");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__tasks__userId__0B91BA14");
            });

            modelBuilder.Entity<Teams>(entity =>
            {
                entity.HasKey(e => e.TeamId)
                    .HasName("PK__teams__5ED7536A4E8E38B5");

                entity.ToTable("teams");

                entity.Property(e => e.TeamId).HasColumnName("teamId");

                entity.Property(e => e.TeamName)
                    .HasColumnName("teamName")
                    .HasMaxLength(50);

                entity.Property(e => e.TeamPoints).HasColumnName("teamPoints");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
