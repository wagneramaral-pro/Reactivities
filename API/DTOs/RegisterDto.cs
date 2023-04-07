using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {

        [Required]
        public string Email {get;set;}
        [Required]
        [RegularExpression("(=?.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",ErrorMessage = "Password must be complex")]
        //[RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",ErrorMessage = "Password ..needs to be complex")]
        public string Password {get;set;}
        [Required]
        public string DisplayName {get;set;}
        [Required]
        public string UserName {get;set;}
    }
}