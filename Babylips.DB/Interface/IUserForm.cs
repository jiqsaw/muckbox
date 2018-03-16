using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.DB.Interface
{
    public interface IUserForm : IBaseEntity
    {
        [Display(Name = "Adın Soyadın")]
        [Required(ErrorMessage = "Ad Soyad gerekli")]
        string NameSurname { get; set; }

        [Display(Name = "Email Adresin")]
        [Required(ErrorMessage = "E-posta adresi gerekli")]
        [EmailAddress(ErrorMessage = "Yanlış e-posta adresi")]
        string Email { get; set; }

        [Display(Name = "Telefon Numaran")]
        [Required(ErrorMessage = "Telefon gerekli")]
        [Phone(ErrorMessage = "Yanlış telefon numarası")]
        string Mobile { get; set; }

        [Display(Name = "il")]
        [Required(ErrorMessage = "Şehir seçmelisin")]
        int CityId { get; set; }

        [Display(Name = "ilce")]
        [Required(ErrorMessage = "İlçe seçmelisin")]
        int CountyId { get; set; }

        [Display(Name = "Adres")]
        [Required(ErrorMessage = "Adresini yazmalısın")]
        string Address { get; set; }

        [Display(Name = "Doğum Tarihin")]
        string Birthday { get; set; }

    }
}