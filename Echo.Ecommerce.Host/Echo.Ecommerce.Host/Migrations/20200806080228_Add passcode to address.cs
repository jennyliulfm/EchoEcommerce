using Microsoft.EntityFrameworkCore.Migrations;

namespace Echo.Ecommerce.Host.Migrations
{
    public partial class Addpasscodetoaddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Passcode",
                table: "Address",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passcode",
                table: "Address");
        }
    }
}
