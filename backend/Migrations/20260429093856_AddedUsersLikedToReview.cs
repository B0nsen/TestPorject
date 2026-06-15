using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedUsersLikedToReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.CreateTable(
                name: "ReviewUser",
                columns: table => new
                {
                    ReviewId = table.Column<long>(type: "bigint", nullable: false),
                    UsersLikedId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewUser", x => new { x.ReviewId, x.UsersLikedId });
                    table.ForeignKey(
                        name: "FK_ReviewUser_T_Review_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "T_Review",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReviewUser_T_User_UsersLikedId",
                        column: x => x.UsersLikedId,
                        principalTable: "T_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewUser_UsersLikedId",
                table: "ReviewUser",
                column: "UsersLikedId");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review",
                column: "UserId",
                principalTable: "T_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.DropTable(
                name: "ReviewUser");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review",
                column: "UserId",
                principalTable: "T_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
