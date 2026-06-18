using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class changedbehaviour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review",
                column: "UserId",
                principalTable: "T_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review",
                column: "UserId",
                principalTable: "T_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
