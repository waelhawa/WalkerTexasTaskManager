using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChuckAPI.Models
{
    public class User
    {
        public int userId { get; set; }
        public int teamID { get; set; }

        public string displayName { get; set; }
    }
}
