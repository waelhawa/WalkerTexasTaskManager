using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WTTM.Models;

namespace WTTM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        WTTM_DBContext _context = new WTTM_DBContext();

        #region Create
        //Created by FrontEnd User Identity Framework
        #endregion

        #region Read
        [HttpGet("getusers")]
        public async Task<ActionResult<List<AspNetUsers>>> GetUsers()
        {
            var users = await _context.AspNetUsers.ToListAsync();
            if (users == null)
            {
                return NoContent();
            }
            else
            {
                return users;
            }
        }

        [HttpGet("getusersbyid/{id}")]
        public async Task<ActionResult<AspNetUsers>> GetUsersById(string id)
        {
            var user = await _context.AspNetUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return user;
            }
        }

        [HttpGet("getusersbyusername/{username}")]
        public async Task<ActionResult<AspNetUsers>> GetUsersByUserName(string userName)
        {
            var users = await _context.AspNetUsers.ToListAsync();
            foreach (var item in users)
            {
                if (item.UserName == userName)
                {
                    return item;
                }
            }
                return NotFound();
        }

        [HttpGet("getusersbyemail/{email}")]
        public async Task<ActionResult<AspNetUsers>> GetUsersByEmail(string email)
        {
            var users = await _context.AspNetUsers.ToListAsync();
            foreach (var item in users)
            {
                if (item.Email == email)
                {
                    return item;
                }
            }
            return NotFound();
        }

        [HttpGet("getusersbyphonenumber/{phonenumber}")]
        public async Task<ActionResult<AspNetUsers>> GetUsersByPhoneNumber(string phoneNumber)
        {
            var users = await _context.AspNetUsers.ToListAsync();
            foreach (var item in users)
            {
                if (item.PhoneNumber == phoneNumber)
                {
                    return item;
                }
            }
            return NotFound();
        }

        [HttpGet("getusersbyteamid/{id}")]
        public async Task<ActionResult<AspNetUsers>> GetUsersByTeamId(int id)
        {
            var users = await _context.AspNetUsers.ToListAsync();
            foreach (var item in users)
            {
                if (item.TeamId == id)
                {
                    return item;
                }
            }
            return NotFound();
        }
        #endregion

        #region Update
        [HttpPut("updateuser/{id}")]
        public async Task<ActionResult> UpdateUser(string id, AspNetUsers user)
        {
            if (id != user.Id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                AspNetUsers updatedUser = _context.AspNetUsers.Find(id);
                updatedUser.TeamId = user.TeamId;
                updatedUser.UserName = user.UserName;
                updatedUser.Email = user.Email;
                updatedUser.PhoneNumber = user.PhoneNumber;

                _context.Entry(updatedUser).State = EntityState.Modified;
                _context.Update(updatedUser);
                await _context.SaveChangesAsync();
                return NoContent();
            }

        }
        #endregion

        #region Delete
        [HttpDelete("deleteuser/{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _context.AspNetUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                user.TeamId = null;
                _context.AspNetUsers.Remove(user);
                await _context.SaveChangesAsync();
                return NoContent();

            }
        }
        #endregion
    }
}
