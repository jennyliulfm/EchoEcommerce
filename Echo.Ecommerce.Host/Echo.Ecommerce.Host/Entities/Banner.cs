using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Echo.Ecommerce.Host.Entities
{
    public enum BannerStatus
    {
        Valid,
        Expired,
    }

    public enum BannerType
    {
        Top_Left_large,
        Top_Right_Small,
        Middle_large,
        Middle_Small_Three,
        Middle_Bottom_Two,
    }

    public class Banner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BannerId { get; set; }

        public string Photo_Url { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public BannerStatus Status { get; set; }
        public BannerType Type { get; set; }
    }
}
