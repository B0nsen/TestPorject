"use client";

import useSWR, { mutate } from "swr";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { DateInput } from "rsuite";

import { USER_KEY, fetcher } from "@/lib/api/user";
import { normalizeDob, toIsoDate } from "@/lib/utils/dob";
import { useAvatar } from "@/lib/hooks/useAvatar";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";

import Avatar from "@/components/Avatar";
import FormButton from "@/components/FormButton";
import EditButton from "@/components/EditButton";

import calendarIcon from "@/assets/icons/calendar_today.svg";

import type { UserData } from "@/lib/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    accountDetailsSchema,
    AccountDetailsValues,
} from "@/lib/validation/accountDetails.schema";

import { FormError } from "@/components/FormError";

export default function AccountDetails() {
    const [dob, setDob] = useState<Date | null>(null);

    const {
        file: selectedFile,
        preview,
        fileInputRef,
        onFileChange,
        openFilePicker,
    } = useAvatar();

    const inputRef = useRef<any>(null);

    const { data: userData } = useSWR<UserData>(USER_KEY, fetcher);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AccountDetailsValues>({
        resolver: zodResolver(accountDetailsSchema),
    });

    useEffect(() => {
        if (!userData) return;

        reset({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone ?? "",
            email: userData.email,
        });

        setDob(normalizeDob(userData.dob));
    }, [userData, reset]);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleValidSubmit = async (data: AccountDetailsValues) => {
        const formData = new FormData();

        formData.set("firstName", data.firstName);
        formData.set("lastName", data.lastName);
        formData.set("email", data.email);
        formData.set("phone", data.phone ?? "");
        formData.set("dob", toIsoDate(dob) ?? "");

        if (data.password?.trim()) {
            formData.set("password", data.password);
        }

        if (selectedFile) {
            formData.append("image", selectedFile);
            formData.append("changeAvatar", "true");
        } else {
            formData.append("changeAvatar", "false");
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/info`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        await mutate(USER_KEY);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <form
            onSubmit={handleSubmit(handleValidSubmit)}
            className="flex flex-col gap-[30px]"
        >
            <div className="flex flex-col gap-[10px]">
                <InputWrapper label="Profile photo">
                    <div className="flex gap-[12px] items-center">
                        <Avatar src={preview || userData.avatar} />
                        <EditButton onClick={openFilePicker} />
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                    />
                </InputWrapper>

                <NameFields register={register} errors={errors} />

                <InputWrapper label="Email">
                    <FormInput
                        placeholder="Email"
                        autoComplete="username"
                        {...register("email")}
                    />
                    <FormError message={errors.email?.message} />
                </InputWrapper>

                <InputWrapper label="Password">
                    <FormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        {...register("password")}
                    />
                </InputWrapper>
                <PhoneField register={register} error={errors} />
                <InputWrapper className="max-w-[200px]" label="Date of Birth">
                    <div className="bg-input-surface-default flex items-center h-[40px] rounded-[10px] px-[15px]">
                        <DateInput
                            value={dob}
                            onChange={setDob}
                            placeholder="Select date"
                            format="MM/dd/yyyy"
                            className="flex-1 min-w-0 bg-transparent outline-none text-input text-[14px] leading-[13px]"
                        />
                        <button
                            type="button"
                            className="h-full flex items-center cursor-pointer shrink-0 ml-2"
                            onClick={() => inputRef.current?.open?.()}
                        >
                            <Image src={calendarIcon} alt="Calendar" width={14} height={16} />
                        </button>
                    </div>
                </InputWrapper>
            </div>

            <FormButton type="submit">
                {isSubmitting ? "Saving..." : "Save"}
            </FormButton>
        </form>
    );
}
