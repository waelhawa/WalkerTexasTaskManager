using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WTTM.Models
{
    public partial class Tasks
    {
        public int TaskId { get; set; }
        public int? SprintId { get; set; }
        public string UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }
        public string ShortDesc { get; set; }
        public string FullDesc { get; set; }
        public int StoryPoint { get; set; }
        public bool IsCompleted { get; set; }
        public string TaskStatus { get; set; }

        public virtual Sprints Sprint { get; set; }
        public virtual AspNetUsers User { get; set; }
    }
}
