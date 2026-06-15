using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedMissingValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropForeignKey(
                name: "FK_T_CartItem_T_User_UserId",
                table: "T_CartItem");

            migrationBuilder.DropIndex(
                name: "IX_T_CartItem_UserId",
                table: "T_CartItem");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "T_User",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "T_User",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "T_User",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "T_User",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Helpful",
                table: "T_Review",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "T_ReviewImages",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ReviewId = table.Column<long>(type: "bigint", nullable: false),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_ReviewImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_T_ReviewImages_T_Review_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "T_Review",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_T_User_Email",
                table: "T_User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_T_CartItem_UserId_ProductId",
                table: "T_CartItem",
                columns: new[] { "UserId", "ProductId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_T_ReviewImages_ReviewId",
                table: "T_ReviewImages",
                column: "ReviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_T_CartItem_T_Users_UserId",
                table: "T_CartItem",
                column: "UserId",
                principalTable: "T_Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "T_ReviewImages");

            migrationBuilder.DropIndex(
                name: "IX_T_User_Email",
                table: "T_User");

            migrationBuilder.DropIndex(
                name: "IX_T_CartItem_UserId_ProductId",
                table: "T_CartItem");

            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "T_User");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "T_User");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "T_User");

            migrationBuilder.DropColumn(
                name: "Helpful",
                table: "T_Review");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "T_User",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_T_CartItem_UserId",
                table: "T_CartItem",
                column: "UserId");
        }
    }
}
