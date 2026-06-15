using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_Product_ProductId",
                table: "T_Review");

            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "T_Review",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ProductId",
                table: "T_Review",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "T_Review",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "T_Review",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "T_Review",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "T_Product",
                type: "double",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "T_Product",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Brand",
                table: "T_Product",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "Sale",
                table: "T_Product",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_Product_ProductId",
                table: "T_Review",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_T_Review_T_Product_ProductId",
                table: "T_Review");

            migrationBuilder.DropForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "T_Review");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "T_Review");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "T_Review");

            migrationBuilder.DropColumn(
                name: "Sale",
                table: "T_Product");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "T_Review",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "ProductId",
                table: "T_Review",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "T_Product",
                type: "double",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "T_Product",
                keyColumn: "Color",
                keyValue: null,
                column: "Color",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "T_Product",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "T_Product",
                keyColumn: "Brand",
                keyValue: null,
                column: "Brand",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Brand",
                table: "T_Product",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_Product_ProductId",
                table: "T_Review",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_T_Review_T_User_UserId",
                table: "T_Review",
                column: "UserId",
                principalTable: "T_User",
                principalColumn: "Id");
        }
    }
}
