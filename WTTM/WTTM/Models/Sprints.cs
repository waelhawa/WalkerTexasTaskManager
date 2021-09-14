using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WTTM.Models
{
    public partial class Sprints
    {
        public Sprints()
        {
            Tasks = new HashSet<Tasks>();
        }

        public int SprintId { get; set; }
        public int? TeamId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCompleted { get; set; }
        public bool IsCompleted { get; set; }
        public string SprintStatus { get; set; }
        public int? TotalStoryPoints { get; set; }

        public virtual Teams Team { get; set; }
        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
