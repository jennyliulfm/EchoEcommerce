using Microsoft.EntityFrameworkCore.Migrations;

namespace Echo.Ecommerce.Host.Migrations
{
    public partial class changeentitypropertyname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Product",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Product");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Product",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: false,
                defaultValue: "");
        }
    }
}
