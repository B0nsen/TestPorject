using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItem_T_Product_ProductId",
                table: "WishlistItem");

            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItem_T_Wishlist_WishlistId",
                table: "WishlistItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WishlistItem",
                table: "WishlistItem");

            migrationBuilder.RenameTable(
                name: "WishlistItem",
                newName: "T_WishlistItem");

            migrationBuilder.RenameIndex(
                name: "IX_WishlistItem_WishlistId",
                table: "T_WishlistItem",
                newName: "IX_T_WishlistItem_WishlistId");

            migrationBuilder.RenameIndex(
                name: "IX_WishlistItem_ProductId",
                table: "T_WishlistItem",
                newName: "IX_T_WishlistItem_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_T_WishlistItem",
                table: "T_WishlistItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_T_WishlistItem_T_Product_ProductId",
                table: "T_WishlistItem",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_T_WishlistItem_T_Wishlist_WishlistId",
                table: "T_WishlistItem",
                column: "WishlistId",
                principalTable: "T_Wishlist",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_T_WishlistItem_T_Product_ProductId",
                table: "T_WishlistItem");

            migrationBuilder.DropForeignKey(
                name: "FK_T_WishlistItem_T_Wishlist_WishlistId",
                table: "T_WishlistItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_T_WishlistItem",
                table: "T_WishlistItem");

            migrationBuilder.RenameTable(
                name: "T_WishlistItem",
                newName: "WishlistItem");

            migrationBuilder.RenameIndex(
                name: "IX_T_WishlistItem_WishlistId",
                table: "WishlistItem",
                newName: "IX_WishlistItem_WishlistId");

            migrationBuilder.RenameIndex(
                name: "IX_T_WishlistItem_ProductId",
                table: "WishlistItem",
                newName: "IX_WishlistItem_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WishlistItem",
                table: "WishlistItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItem_T_Product_ProductId",
                table: "WishlistItem",
                column: "ProductId",
                principalTable: "T_Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItem_T_Wishlist_WishlistId",
                table: "WishlistItem",
                column: "WishlistId",
                principalTable: "T_Wishlist",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
