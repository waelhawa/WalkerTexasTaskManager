using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WTTM.Models
{
    public static class UserInfo
    {
        public static string getUID(this ClaimsPrincipal user)
        {
            if (!user.Identity.IsAuthenticated)
            {
                return null;
            }
            else
            {
                ClaimsPrincipal currentUser = user;
                return currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            }
        }
    }
}
