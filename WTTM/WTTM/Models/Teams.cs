using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WTTM.Models
{
    public partial class Teams
    {
        public Teams()
        {
            AspNetUsers = new HashSet<AspNetUsers>();
            Sprints = new HashSet<Sprints>();
        }

        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public int? TeamPoints { get; set; }

        public virtual ICollection<AspNetUsers> AspNetUsers { get; set; }
        public virtual ICollection<Sprints> Sprints { get; set; }
    }
}
