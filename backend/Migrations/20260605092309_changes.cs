using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_T_Category_CategoryId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_T_Product_ProductId",
                table: "ProductCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory");

            migrationBuilder.RenameTable(
                name: "ProductCategory",
                newName: "T_ProductCategory");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_ProductId",
                table: "T_ProductCategory",
                newName: "IX_T_ProductCategory_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_T_ProductCategory",
                table: "T_ProductCategory",
                columns: new[] { "CategoryId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_T_ProductCategory_T_Category_CategoryId",
                table: "T_ProductCategory",
                column: "CategoryId",
                principalTable: "T_Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_T_ProductCategory_T_Product_ProductId",
                table: "T_ProductCategory",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_ProductCategory_T_Category_CategoryId",
                table: "T_ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_T_ProductCategory_T_Product_ProductId",
                table: "T_ProductCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_T_ProductCategory",
                table: "T_ProductCategory");

            migrationBuilder.RenameTable(
                name: "T_ProductCategory",
                newName: "ProductCategory");

            migrationBuilder.RenameIndex(
                name: "IX_T_ProductCategory_ProductId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory",
                columns: new[] { "CategoryId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_T_Category_CategoryId",
                table: "ProductCategory",
                column: "CategoryId",
                principalTable: "T_Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_T_Product_ProductId",
                table: "ProductCategory",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
